import type {PublicationRecord} from '@/lib/types';
import {NotebookSocialEdition} from './NotebookSocialEdition';
export function NotebookSocialCard({record}:{record:PublicationRecord}){
 return <NotebookSocialEdition record={record} format="og"/>;
}
