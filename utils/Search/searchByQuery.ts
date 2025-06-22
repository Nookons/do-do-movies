interface ISearchParamsObj {
    fromYear: string | null;
    toYear: string | null;
    genresParse: number[];
    page: number | undefined;
}

export const searchByQuery = async ({ obj }: { obj: ISearchParamsObj }) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTY5MTcxMTc5OS44ODEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QEf4iMPiwzpLvKOgqzZJFFzdFT_9GSMmZt4ZLe0Mfyw'
        }
    };

    const from = obj.fromYear ? `${obj.fromYear}-01-01` : undefined;
    const to = obj.toYear ? `${obj.toYear}-01-01` : undefined;

    const query = new URLSearchParams({
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        page: String(obj.page ?? 1),
        with_genres: obj.genresParse.join(','),
        'vote_count.gte': '0',
        ...(from ? { 'primary_release_date.gte': from } : {}),
        ...(to ? { 'primary_release_date.lte': to } : {})
    }).toString();

    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?${query}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};
