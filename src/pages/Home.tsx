import { useState, useEffect } from "react";
import DestinationCard from "../components/DestinationCard";
import DestinationForm from "../components/DestinationForm";

type Destination = {
    id: number;
    name: string;
    description: string;
    image: string;
};

// 💡 1. 安定したURLを持つ初期データを定義
const INITIAL_DESTINATIONS: Destination[] = [
    { id: 1, name: "京都", description: "古都の風情あふれる街並みと歴史的建造物が魅力です。", image: "https://placehold.jp/800x600.png" },
    { id: 2, name: "沖縄", description: "美しい海とリゾート気分を味わえる人気の観光地です。", image: "https://placehold.jp/800x600.png" },
    { id: 3, name: "北海道", description: "四季折々の自然とグルメが楽しめる広大な地域。", image: "https://placehold.jp/800x600.png" },
];

// 💡 1. Local Storageからデータを読み込む関数を定義
const initializeDestinations = (): Destination[] => {
    const saved = localStorage.getItem("destinations");
    if (saved !== null) {
        try {
            const parsed = JSON.parse(saved);
            // キーが存在し、有効な配列（空[]も含む）であれば、それを返す
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (error) {
            console.error("Local storage data is corrupted.", error);
            //不正なデータの場合：初期データを使用する
            return INITIAL_DESTINATIONS;
        }
    }
    // 💡 2. データがない場合：初期データを使用する
    return INITIAL_DESTINATIONS;
};


export default function Home() {
    // 💡 3. useStateの初期値としてinitializeDestinations関数を渡す
    const [destinations, setDestinations] = useState<Destination[]>(initializeDestinations);
    const [editing, setEditing] = useState<Destination | null>(null);

    // destinations が変わるたび localStorage に保存
    useEffect(() => {
        localStorage.setItem("destinations", JSON.stringify(destinations));
    }, [destinations]);

    // 追加
    const handleAdd = (newDest: Omit<Destination, "id">) => {
        // ID生成ロジックの改善：最大値を使う
        const newId = destinations.length > 0
            ? Math.max(...destinations.map(d => d.id)) + 1
            : 1;

        const newDestination = {
            ...newDest,
            id: newId,
        };
        setDestinations([...destinations, newDestination]);
    };

    // 削除
    const handleDelete = (id: number) => {
        setDestinations(destinations.filter((d) => d.id !== id));
    };

    // 編集開始
    const handleEdit = (dest: Destination) => {
        setEditing(dest);
    };

    // 更新
    const handleUpdate = (updated: Destination, clearImage: boolean = false) => {
        let finalUpdated = updated;

        if (clearImage) {
            // 画像をクリアして Local Storageに保存
            finalUpdated = { ...updated, image: "" };
        }

        setDestinations(destinations.map((d) => (d.id === finalUpdated.id ? finalUpdated : d)));

        // 💡 変更点: 画像クリア要求があった場合は、編集を継続させるためにフォームを閉じない
        if (!clearImage) {
            setEditing(null); // 画像クリア要求がない（＝通常の更新）の場合のみフォームを閉じる
        }

        // 注意: clearImageがtrueの場合、Local Storageは更新されますが、
        // 編集モードは継続するため、画面上は画像が消えた状態で編集フォームが残ります
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <DestinationForm
                onAdd={handleAdd}
                editing={editing}
                onUpdate={handleUpdate}
                onCancel={() => setEditing(null)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {destinations.map((destination) => (
                    <DestinationCard
                        key={destination.id}
                        destination={destination}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}