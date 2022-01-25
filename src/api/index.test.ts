import { fetchData } from '.';
import { Data } from './types';

test('fetchData', async () => {
    const fetchedData = (await fetchData("USA")) as Data;
});