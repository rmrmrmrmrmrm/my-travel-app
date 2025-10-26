import { useParams, Link } from "react-router-dom";

// Home.tsx と同じ Destination 型を定義
type Destination = {
    id: number;
    name: string;
    description: string;
    image: string;
};

// 💡 Local Storageから全データを読み込む関数
const loadDestinations = (): Destination[] => {
    const saved = localStorage.getItem("destinations");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // 配列形式であることを確認し、有効なら返す
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (error) {
            console.error("Failed to parse local storage data in Detail view.", error);
        }
    }
    // データがない、またはパース失敗の場合は空配列を返す
    return [];
};

export default function DestinationDetail() {
    // ページが表示されるたびにLocal Storageからデータを読み込む
    const destinations = loadDestinations();

    // URL から id を取得
    const { id } = useParams<{ id: string }>();

    // 読み込んだデータから該当IDの目的地を検索
    // id は文字列として取得されるため、Number(id)で数値に変換して比較
    const destination = destinations.find((d) => d.id === Number(id));

    if (!destination) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-500 text-lg">該当する行き先が見つかりません。</p>
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                    一覧に戻る
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* 画像があるときだけ描画 */}
            {destination.image && (
                <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                />
            )}
            <h1 className="text-2xl font-bold mt-4">{destination.name}</h1>
            <p className="mt-2 text-gray-700">{destination.description}</p>
            <Link
                to="/"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
            >
                ← 一覧に戻る
            </Link>
        </div>
    );
}
