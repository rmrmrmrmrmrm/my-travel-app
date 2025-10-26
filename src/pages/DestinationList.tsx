
type Destination = {
  id: number;
  title: string;
  memo: string;
  imageURL?: string; // オプション
};

const dummyData: Destination[] = [
  { id: 1, title: "京都旅行", memo: "伏見稲荷大社に行く", imageURL: "https://placehold.jp/800x600.png" },
  { id: 2, title: "箱根旅行", memo: "温泉に入る", imageURL: "https://placehold.jp/800x600.png" },
  { id: 3, title: "鎌倉旅行", memo: "大仏見学", imageURL: "https://placehold.jp/800x600.png" },
];

export default function DestinationList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">行き先一覧ページ</h1>
      <ul>
        {dummyData.map((dest) => (
          <li key={dest.id} className="border p-2 mb-2 rounded">
            <h2 className="font-semibold">{dest.title}</h2>
            <p>{dest.memo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
