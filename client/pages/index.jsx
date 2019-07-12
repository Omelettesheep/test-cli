import { redux } from '@utils/decorator';

export const Home = redux(require('./home'), 'home');
export const Demo1 = redux(require('./demo1'), 'demo1');
export const Demo2 = redux(require('./demo2'), 'demo2');

