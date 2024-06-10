// Lesson 7
function useState<T>(initial: T): [() => T, (v: T) => void] {
    let state = initial;
    return [
        () => state,
        (v: T) => {
            state = v;
        }
    ];
}

const [g, s] = useState(10);
console.log('getter1: ', g());
s(20);
console.log('getter2: ', g());

const [g2, s2] = useState<number | null>(null);
console.log('getter1: ', g2());
s2(20);
console.log('getter2: ', g2());

interface Rank<RankItem> {
    item: RankItem;
    rank: number;
}

function ranker<RankItem>(
    items: RankItem[],
    rank: (v: RankItem) => number
): RankItem[] {
    const ranks: Rank<RankItem>[] = items.map(item => ({
        item,
        rank: rank(item)
    }));

    ranks.sort((a, b) => a.rank + b.rank);

    return ranks.map(rank => rank.item);
}

interface f1Car {
    name: string;
    power: number;
}

const f1Cars: f1Car[] = [
    {
        name: 'red bull',
        power: 980
    },
    {
        name: 'mclaren',
        power: 945
    },
    {
        name: 'stakeF1',
        power: 780
    }
];

console.log(ranker(f1Cars, ({ power }) => power));
