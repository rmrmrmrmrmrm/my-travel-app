src/
├── components/
│   ├── DestinationCard.jsx        # 一覧ページのカード
│   └── ImagePreview.jsx           # 画像プレビュー用
│
├── pages/
│   ├── DestinationList.jsx        # 一覧ページ（/）
│   ├── DestinationDetail.jsx      # 詳細ページ（/detail/:id）
│   └── DestinationForm.jsx        # 登録フォーム（/new）
│
├── context/
│   └── DestinationContext.jsx     # （後で追加）全体の状態管理
│
├── assets/
│   └── sample.jpg                 # 仮画像など
│
├── App.jsx                        # ルーティング設定
├── main.jsx                       # Reactエントリーポイント
└── index.css                      # TailwindのCSS
