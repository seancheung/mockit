import { Router } from 'express';

declare function mockit(file: string, watch?: boolean): Router;
declare namespace mockit {

}

export = mockit;
