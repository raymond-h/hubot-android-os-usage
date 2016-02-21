import got from 'got';

export const API_URL = 'https://tonicdev.io/raymond-h/android-os-usage-api/branches/master';

export async function getApiToTarget(percent) {
    const data = await got.get(API_URL, { json: true });
    data.reverse();

    for(var i = 0; i < data.length; i++) {
        if(percent <= data[i].percent) return data[i];

        percent -= data[i].percent;
    }

    return null;
}
