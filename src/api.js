import got from 'got';

export const API_URL = 'https://tonicdev.io/raymond-h/android-os-usage-api/branches/master';

export async function getVersionData() {
    const res = await got.get(API_URL, { json: true });
    return res.body;
}

export async function getApiToTarget(percent) {
    const data = await getVersionData();

    for(var i = data.length-1; i >= 0; i--) {
        if(percent <= data[i].percent) return data[i];

        percent -= data[i].percent;
    }

    return null;
}
