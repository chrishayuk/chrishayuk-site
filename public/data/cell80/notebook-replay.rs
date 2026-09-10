//! Export recorded spatial frames for the Notebook. Does not alter engine semantics.
use cell80_life::{
    ex2::{self, FieldOverride, GenePools, MutationMode, RunConfig2DGenome, StartingGenome2},
    ex3::{self, RunConfig3, StartingGenome3},
    genes::{CompiledGene, EngineKind},
    history::Species,
    lineage::{detect_plurality_events, Role},
    load_starting_genome,
    pools::{discover_pools, Pools},
};
use serde_json::{json, Value};
use std::{
    collections::{HashMap, HashSet},
    path::{Path, PathBuf},
};
fn hex(bytes: &[u8]) -> String {
    bytes.iter().map(|b| format!("{b:02x}")).collect()
}
fn food(values: &[u16]) -> String {
    values
        .chunks(4)
        .map(|c| {
            char::from_digit(
                c.iter()
                    .enumerate()
                    .fold(0, |v, (i, f)| v | (u32::from(*f > 0) << i)),
                16,
            )
            .unwrap()
        })
        .collect()
}
fn start(name: &str, p: &Pools) -> StartingGenome2 {
    let s = load_starting_genome(
        &Path::new(env!("CARGO_MANIFEST_DIR")).join(format!("genomes/{name}.json")),
    );
    StartingGenome2 {
        initial_energy: s.initial_energy,
        decay_amount: s.decay_amount,
        repro_threshold: s.repro_threshold,
        repro_give_pct: s.repro_give_pct,
        hungry_promoter: p.promoter_index(&s.genes.hungry_promoter),
        repro_promoter: p.promoter_index(&s.genes.repro_promoter),
        sense_move: p.movement_index(&s.genes.sense_move),
    }
}
fn genes(path: &Path, p: &Pools) -> GenePools {
    let load = |name: &str| {
        let mut g = CompiledGene::load_cpu(path, name).unwrap();
        g.enable_memoization();
        g
    };
    GenePools {
        decay: load("sub_sat"),
        eat: load("add_sat"),
        split: load("discount_percent"),
        hungry_pool: p.promoters.iter().map(|n| load(n)).collect(),
        repro_pool: p.promoters.iter().map(|n| load(n)).collect(),
        sense_pool: p.movement.iter().map(|n| load(n)).collect(),
    }
}
fn main() {
    let args: Vec<_> = std::env::args().collect();
    let mode = &args[1];
    let path = PathBuf::from(&args[2]);
    let dest = PathBuf::from(&args[3]);
    let p = discover_pools(&path);
    let g = genes(&path, &p);
    let s = start("grazer", &p);
    eprintln!(
        "{mode}: {} promoters, {} movement cells; CPU interpreter with exact memoization",
        p.promoters.len(),
        p.movement.len()
    );
    let common = json!({"version":1,"engine":"CPU reference interpreter with exact output + instruction-count memoization","snapshot":"End of tick; food after regrowth; no interpolated positions","organismFields":["id","tile","energy","species","reproductionProgram","threshold","descendantOf2231"],"foodEncoding":"one hexadecimal digit per four row-major tiles, low bit first; 1 = 40 food","promoters":p.promoters,"movement":p.movement});
    let mut result = common;
    if mode == "lineage" {
        let cfg = RunConfig2DGenome {
            seed: 1,
            ticks: 2000,
            initial_organisms: 8,
            world_width: 32,
            world_height: 32,
            food_density: 0.2,
            food_value: 40,
            regrow_ticks: 8,
            mutation_mode: MutationMode::Full,
            swap_mutate_pct: 8,
        };
        let a = ex2::run(EngineKind::Gpu, &cfg, &s, &g);
        let b = ex2::run_with_overrides(
            EngineKind::Gpu,
            &cfg,
            &s,
            &g,
            &HashMap::from([(
                2231,
                FieldOverride {
                    skip_repro_swap: true,
                    ..Default::default()
                },
            )]),
        );
        let birth = a.births.iter().find(|b| b.child_id == 2231).unwrap();
        assert_eq!(
            (
                birth.parent_id,
                birth.tick,
                birth.repro_threshold,
                birth.repro_promoter
            ),
            (2059, 994, 192, 33)
        );
        let parent = a.births.iter().find(|b| b.child_id == 2059).unwrap();
        assert_eq!((parent.repro_threshold, parent.repro_promoter), (198, 37));
        assert!(a
            .ticks
            .iter()
            .zip(&b.ticks)
            .take_while(|(t, _)| t.tick < 994)
            .all(|(a, b)| a == b));
        let event = detect_plurality_events(&a.ticks, Role::Repro, 20, 5)
            .into_iter()
            .find(|e| e.shift_tick == 1080 && e.to == 33)
            .unwrap();
        assert!(!detect_plurality_events(&b.ticks, Role::Repro, 20, 5)
            .iter()
            .any(|e| e.to == 33 && e.shift_tick.abs_diff(1080) <= 40));
        let rb = b.births.iter().find(|b| b.child_id == 2231).unwrap();
        assert_eq!(
            (rb.tick, rb.repro_threshold, rb.repro_promoter),
            (994, 192, 37)
        );
        result["kind"] = json!("lineage");
        result["width"] = json!(32);
        result["height"] = json!(32);
        result["seed"] = json!("1");
        result["libraryCommit"] = json!("b989b81c52c64ed75048521b59c47ad56fa07b76");
        result["verification"] = json!({"preForkIdentical":true,"originBirth":2231,"originTick":994,"shiftTick":1080,"share":event.share_at_shift,"peak":event.peak_share_in_window,"eventAfterRevert":false});
        let histories:Vec<_>=[("Observed history",&a),("Program change undone",&b)].iter().map(|(label,out)|{let mut lineage=HashSet::from([2231]);for b in &out.births {if lineage.contains(&b.parent_id){lineage.insert(b.child_id);}}let frames:Vec<_>=out.ticks.iter().filter(|t|t.tick%2==0||(990..=1200).contains(&t.tick)||t.tick==1999).map(|t| json!({"tick":t.tick,"food":food(&t.food),"organisms":t.organisms.iter().map(|o|[o.id,u32::from(o.y)*32+u32::from(o.x),u32::from(o.energy),0,u32::from(o.repro_promoter),u32::from(o.repro_threshold),u32::from(lineage.contains(&o.id))]).collect::<Vec<_>>(),"births":t.births,"deaths":t.starved,"kills":0})).collect();json!({"label":label,"hash":hex(&out.history_hash),"frames":frames})}).collect();
        result["histories"] = json!(histories);
        eprintln!(
            "Historical event verified: {:.1}% / {:.1}%; pre-fork identical; counterfactual absent",
            event.share_at_shift * 100.,
            event.peak_share_in_window * 100.
        );
    } else {
        let to3 = |s: StartingGenome2, species| StartingGenome3 {
            species,
            initial_energy: s.initial_energy,
            decay_amount: s.decay_amount,
            repro_threshold: s.repro_threshold,
            repro_give_pct: s.repro_give_pct,
            hungry_promoter: s.hungry_promoter,
            repro_promoter: s.repro_promoter,
            sense_move: s.sense_move,
        };
        let cfg = RunConfig3 {
            seed: 42,
            ticks: 10000,
            initial_grazers: 60,
            initial_predators: 10,
            world_width: 48,
            world_height: 48,
            food_density: 0.3,
            food_value: 40,
            regrow_ticks: 8,
            mutation_mode: MutationMode::Controlled {
                swap_bps: 200,
                role_mask: 7,
            },
            swap_mutate_pct: 8,
            predator_satiation_ticks: 20,
        };
        let out = ex3::run(
            EngineKind::Gpu,
            &cfg,
            &to3(s, Species::Grazer),
            &to3(start("predator", &p), Species::Predator),
            &g,
        );
        let evidence: Value =
            serde_json::from_str(&std::fs::read_to_string(&args[4]).unwrap()).unwrap();
        let row = evidence["predators"]
            .as_array()
            .unwrap()
            .iter()
            .find(|r| r["seed"] == "42" && r["swap_bps"] == 200)
            .unwrap();
        assert_eq!(row["hash"], hex(&out.history_hash));
        assert_eq!(row["grazers"], out.final_grazers);
        assert_eq!(row["predators"], out.final_predators);
        result["kind"] = json!("ecology");
        result["width"] = json!(48);
        result["height"] = json!(48);
        result["seed"] = json!("42");
        result["swapPercent"] = json!(2);
        result["verification"] = json!({"closureHistoryHashMatches":true,"grazers":out.final_grazers,"predators":out.final_predators});
        let frames:Vec<_>=out.ticks.iter().filter(|t|t.tick%20==0||t.tick==9999).map(|t|json!({"tick":t.tick,"food":food(&t.food),"organisms":t.organisms.iter().map(|o|[o.id,u32::from(o.y)*48+u32::from(o.x),u32::from(o.energy),u32::from(o.species==Species::Predator),u32::from(o.repro_promoter),u32::from(o.repro_threshold),0]).collect::<Vec<_>>(),"births":t.births,"deaths":t.starved,"kills":t.predation_kills})).collect();
        result["histories"] =
            json!([{"label":"Predators + grazers","hash":hex(&out.history_hash),"frames":frames}]);
        eprintln!("EX-9 full 10,000-tick hash matches closure record");
    }
    std::fs::write(&dest, serde_json::to_vec(&result).unwrap()).unwrap();
    eprintln!(
        "Wrote {} ({} bytes)",
        dest.display(),
        std::fs::metadata(&dest).unwrap().len()
    );
}
