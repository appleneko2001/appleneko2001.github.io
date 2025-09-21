import type {ProjectStatus} from "$lib/apis/project-status";

export interface ProjectEntryCover {
    isIcon?: boolean;   // is icon or cover bitmap
    url?: string;       // cover bitmap url
    icon?: string;      // icon index
}

export interface ProjectEntryLinks {
    name: string;
    url: string;
    icon?: string;
}

export interface ProjectEntry {
    id: string;                 // stupid id
    header: string;             // project title
    status?: ProjectStatus;     // status
    date: string | Date;        // initial date
    desc?: string;              // description
    cover?: ProjectEntryCover;  // cover picture
    links?: ProjectEntryLinks[];// related links
}

