# Tortoise Git已经载入了ppk却还是要password的问题.md

前提：__已经用puttyagent载入了ppk，或者clone的时候指定了ppk__

修改方法：

1. 右键 → `TortoiseGit` → `Settings` → `Git` → `Credential`
2. `Credential helpler` 选 `Advanced`
3. `Config type` 选 `Global`
4. `URL` 填 `git@域名:命名空间/仓库名.git`
5. `Helper` 填 `wincred`
6. 点`Apply`

