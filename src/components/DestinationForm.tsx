import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";// TypeScript 5.0 以降の推奨方法

type Destination = {
    id: number;
    name: string;
    description: string;
    image: string;
};

type Props = {
    onAdd: (newDestination: Omit<Destination, "id">) => void;
    editing?: Destination | null;
    onCancel: () => void;
    onUpdate: (updated: Destination, deleteImage: boolean) => void;//画像削除１：第二引数に
};

export default function DestinationForm({ onAdd, editing, onUpdate, onCancel }: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");//画像削除２：DataURLは非常に長くなるため、再レンダリングを避けるためにmemo化を検討しても良いですが、今回はシンプルに
    const [fileInputKey, setFileInputKey] = useState(Date.now());//ファイル名のリセット用キーに利用

    // 編集時：既存データをフォームにセット
    useEffect(() => {
        setName(editing?.name || "");
        setDescription(editing?.description || "");
        setImage(editing?.image || "");// 画像削除３：編集データがあれば、そのimageをセット
    }, [editing]);

    // 画像プレビュー
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImage(editing?.image || "");//画像削除４：ファイル選択がキャンセルされた場合、imageステートを空に戻す
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    //画像削除５：画像削除ボタンのハンドラ
    const handleDeleteImageClick = () => {
        if (editing && onUpdate) {
            // Home.tsx に画像をクリアするリクエストを送る (Local Storageのimageパスを空にする)
            onUpdate(editing, true);
            // フォームのimageステートをクリア
            setImage("");
            //ファイル名のリセット：keyの値を変更してコンポーネントを再構築させる
            setFileInputKey(Date.now());
            // フォームを閉じる
            //onCancel && onCancel();
        }
    };

    // 追加 or 更新
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editing) {
            // 編集して更新
            onUpdate({ ...editing, name, description, image }, false);
        } else {
            // 新規追加
            onAdd({ name, description, image });
        }

        // フォームをクリア
        setName("");
        setDescription("");
        setImage("");

        //ファイル入力も同時にリセット
        setFileInputKey(Date.now());

        // 編集モードの場合はフォームを閉じないように注意
        if (editing) {
            // onUpdateが setEditing(null) を制御しているため、ここでは不要
        } else {
            // 新規追加後にフォームをクリアしたため、特に何もしない
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">
                {editing ? "行き先を編集" : "新しい行き先を追加"}
            </h2>

            <div className="mb-3">
                <label className="block mb-1 font-medium">名前</label>
                <input
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="block mb-1 font-medium">説明</label>
                <textarea
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="block mb-1 font-medium">画像（任意）</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    key={fileInputKey}//ファイル名リセット：fileInputKeyをkeyとして設定
                />
                <div className="flex items-end gap-2">
                    {image && <img src={image} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />}

                    {/* 画像削除６：編集モードであり、かつ現在のフォームの 'image' ステートに画像URLが残っている場合のみ表示 */}
                    {editing && image && (
                        <button
                            type="button"
                            onClick={handleDeleteImageClick}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 h-10 mt-2"
                        >
                            画像を削除
                        </button>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editing ? "更新" : "追加"}
                </button>

                {editing && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        キャンセル
                    </button>
                )}
            </div>
        </form>
    );
}