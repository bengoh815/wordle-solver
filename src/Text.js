import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Text() {
    const { words, error } = useSWR('/api/staticdata', fetcher);
    console.log(words);
    console.log("seperator");
    console.log(error);
    if (error) return <div>Failed to load</div>;

    if (!words) return <div>Loading...</div>;
    
    return (
        <div>
            <p>
                {words.words}
            </p>
        </div>
    );
}