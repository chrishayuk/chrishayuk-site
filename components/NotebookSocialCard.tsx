import type {PublicationRecord} from '@/lib/types';
import {NotebookSocialEdition} from './NotebookSocialEdition';
export function NotebookSocialCard({record,assetOrigin}:{record:PublicationRecord;assetOrigin:string}){
 return <NotebookSocialEdition record={record} format="og" assetOrigin={assetOrigin}/>;
}
