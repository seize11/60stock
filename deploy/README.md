## 发布到测试环境
```shell
cd deploy
ansible-playbook -i hosts -l test site.yml  --extra-vars="version=XXXX"
```

## 发布到生产环境
```shell
cd deploy
ansible-playbook -i hosts -l prod site.yml  --extra-vars="version=XXXX"
```