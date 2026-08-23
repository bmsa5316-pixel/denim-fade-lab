# DENIM FADE LAB V1

TCB 1890 No.2 SETUP の経年変化記録サイトの初期版です。

## 現在できること

- TCB 1890 Jacket / Jeans のBASELINE表示
- 着用開始日・洗濯回数・乾燥機回数などの表示
- Day 0 → Day 30 → Day 90 → Day 180 → Day 365 の記録タイムライン
- `data/projects.json` を変更するだけで記録を追加できる構造

## GitHub Pages

1. このフォルダの内容をGitHubリポジトリへ配置
2. GitHub Pagesを `main` ブランチの `/root` から公開
3. 公開URLを確認

## 次のV2

- スマホから写真をアップロードする入力画面
- 写真の自動リネーム
- 前回写真との比較画像
- Day数の自動計算
- AIによる経年変化レポート
- Silverstone / EVISU追加
- GitHub Actionsによる自動公開
- アフィリエイト導線

## 記録ルール

BASELINEは2026-08-23。
以後は同じ場所・同じ構図・同じ倍率・同じ照明条件を維持する。


## V2追加：スマホ入力画面

`admin.html` を開くと、次回の経年変化記録をスマホから入力できます。

現時点では安全のため「記録JSONの作成」までです。写真やJSONを自動的にGitHubへ保存するには、次段階でGitHub Actions/API連携を追加します。



## V3：自動更新基盤

`main` に記録データや画像を追加すると GitHub Actions が自動実行されます。

- `scripts/validate_data.py`：データ検証
- `scripts/build_site.py`：公開用の生成データ作成
- `.github/workflows/build-site.yml`：自動実行

### セキュリティ

ブラウザに GitHub PAT を埋め込まないでください。
スマホから写真を直接送信する部分は、次段階で安全なサーバー側経由にします。

### 次の実装

1. スマホ入力フォーム
2. 写真の安全なアップロード先
3. サーバー側でGitHubへ保存
4. Actionsを起動
5. 自動でDay数・比較画像・レポートを生成
