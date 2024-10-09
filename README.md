
## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```



```
social-media
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ images
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ src
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ decorators
│  │  │  └─ roles.decorator.ts
│  │  ├─ dto
│  │  │  ├─ auth-user.dto.ts
│  │  │  └─ index.ts
│  │  └─ guards
│  │     ├─ auth.guard.ts
│  │     ├─ jwt.strategy.ts
│  │     └─ roles.guard.ts
│  ├─ chat
│  │  ├─ chat.module.ts
│  │  ├─ chat.service.ts
│  │  ├─ dto
│  │  │  ├─ active-conversation.dto.ts
│  │  │  ├─ conversation.dto.ts
│  │  │  └─ message.dto.ts
│  │  ├─ entities
│  │  │  ├─ active-conversation.ts
│  │  │  ├─ conversation.entity.ts
│  │  │  └─ message.entity.ts
│  │  └─ gateway
│  │     └─ chat.gateway.ts
│  ├─ main.ts
│  ├─ posts
│  │  ├─ dto
│  │  │  └─ post.dto.ts
│  │  ├─ entities
│  │  │  └─ post.entity.ts
│  │  ├─ guards
│  │  │  └─ is-creator.guard.ts
│  │  ├─ posts.controller.ts
│  │  ├─ posts.module.ts
│  │  └─ posts.service.ts
│  ├─ shared
│  │  └─ interceptors
│  │     ├─ createUser.interceptor.ts
│  │     └─ index.ts
│  └─ users
│     ├─ dto
│     │  ├─ create-user.dto.ts
│     │  ├─ friend-request.dto.ts
│     │  └─ role.dto.ts
│     ├─ entities
│     │  ├─ friend-request.entity.ts
│     │  └─ user.entity.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```
```
social-media
├─ .eslintrc.js
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 01
│  │  │  ├─ 0aeb77207e8203655e12a3163a8506b104c20c
│  │  │  └─ 4afe3915a02d54c2ab2110c664d4692b2393db
│  │  ├─ 05
│  │  │  ├─ 0def56e7ce62f825fe6ad5927649ecfa732458
│  │  │  ├─ 41a8f05247f43da4a6c6f5ee2626a0443e03cc
│  │  │  ├─ 4c22249ee7da343351d1cc053815b3cc65e585
│  │  │  └─ 68fb149e879125e0570d98b5dc095456ee048c
│  │  ├─ 06
│  │  │  ├─ 4ac76b923fe7a2e7106bc715b53ca06c265850
│  │  │  └─ 8c9534c8f9b4be2db53a3ec85d12ba65d13863
│  │  ├─ 07
│  │  │  └─ b5bc6a0bc504485b50b8ba004f81f06198d8cf
│  │  ├─ 08
│  │  │  └─ 41f8cce0e0ed37da55fa4031645f63253ea2e0
│  │  ├─ 0a
│  │  │  └─ fc919c218d24b0d0a301881301642e4aeb9d9d
│  │  ├─ 0c
│  │  │  └─ 9cb6534f817880b7e7b8bcfe8ec1357436849d
│  │  ├─ 0e
│  │  │  └─ a09a1cae9d1e196b800e84906405844107a74c
│  │  ├─ 0f
│  │  │  └─ 93b3171d7f8a3aab69c91fdd9c74cae116b4bc
│  │  ├─ 10
│  │  │  ├─ 723dc8c5c95a1adae28a9c475c834fbe971b6e
│  │  │  └─ c88d3f253ecf85c25fc0169cc39411e4f96872
│  │  ├─ 11
│  │  │  └─ 7e40d223aae73761cee3175e9708393c0d52a1
│  │  ├─ 13
│  │  │  └─ 181e0ba1ffebbecdc0bed27c7948ae455c2eaa
│  │  ├─ 14
│  │  │  └─ f7ba2fa571dff0737d765779c3bf10bf1512da
│  │  ├─ 16
│  │  │  ├─ 91199646c25a8a3a766f44ee75321b4d5c29fe
│  │  │  └─ c4abd77810fab7a95055879eb913d24a60ae23
│  │  ├─ 19
│  │  │  └─ 93c32db80168b849abcda02a09203fc04178cc
│  │  ├─ 1a
│  │  │  └─ 2a85d6a82e61076869f2ea1a63bdee4352dc2c
│  │  ├─ 1b
│  │  │  ├─ 5fd156d6d5031bd492519d7cda5ba9347c2669
│  │  │  ├─ 74ff5045aa75f1bd58c08984ce94502d8293f8
│  │  │  └─ dccbf34c245a51c31896889305babbf354fc19
│  │  ├─ 1c
│  │  │  └─ 7259299342fddda532910842faa878e8153cd6
│  │  ├─ 1f
│  │  │  ├─ 96831a0dc731f74cad023002775050fe9e13c6
│  │  │  └─ a6193876a27fbbff5a08db1e8ed97267f85e4f
│  │  ├─ 23
│  │  │  ├─ 632469be0d471de712e73665d1eb69204ce7be
│  │  │  ├─ 87db6846ad946fc9f09b8527d9e8b769f2ce82
│  │  │  └─ a0de9d38f72410ea7c1ea0dd3a7ce182595ddb
│  │  ├─ 24
│  │  │  └─ df19ac6932af524b88cb52d12f82a9681fa2aa
│  │  ├─ 25
│  │  │  ├─ 4642a67f801a0e6e67cae5d4429e6aa883a9b3
│  │  │  ├─ 9de13c733a7284a352a5cba1e9fd57e97e431d
│  │  │  └─ f04a58126869a00a5fd202e76f4f43aef9e934
│  │  ├─ 27
│  │  │  └─ a9c75436b7d25f32f14d5bd3bd90cda2e15443
│  │  ├─ 28
│  │  │  └─ 3316736d95ec256006b19ebf396edb035d6b99
│  │  ├─ 29
│  │  │  └─ 200d7e817a4c4ba75ac0b5abc72f557a26d703
│  │  ├─ 2a
│  │  │  ├─ 66d33f6abdb0b797da24575ee09616284ab350
│  │  │  └─ f49bf4d68adeb0537c4b87ebf87091443d9372
│  │  ├─ 2b
│  │  │  └─ 05aba0fbf15c5c9f6aaecc6ded600569c8e9aa
│  │  ├─ 2d
│  │  │  └─ b8d6950f31ee3b4986d5f568480000d6fe2c8b
│  │  ├─ 2e
│  │  │  ├─ 3675370309a6317fd868d1edbcafa6c524390b
│  │  │  └─ a27e9d8ea7256b73e4ae5c7dea5cfa15b1b498
│  │  ├─ 2f
│  │  │  ├─ 86c7d5ea8d5d0b8eaddf285fb6e4a930d7c5b0
│  │  │  └─ 9d2624b7b86a69d60551744c186c223047f3aa
│  │  ├─ 30
│  │  │  └─ bbbf92d5379568ba24548a204b970611af4a66
│  │  ├─ 37
│  │  │  └─ 03e291454ac34cc969932fc052a3bbeb79e882
│  │  ├─ 38
│  │  │  ├─ 18c981a3eb5b28ac23c758712a17d5c0dc473b
│  │  │  ├─ 4c22342b458cef25e6690c04e71d53b1370c9f
│  │  │  └─ 8ffd58bcd36b847d079f430e54c8287b4c8414
│  │  ├─ 3c
│  │  │  └─ 1e4d7b2f0c4fed6a465da41acdd8dc5dbfa81c
│  │  ├─ 3e
│  │  │  └─ b39a16e66b2e65d668ada57d0e01228d51a425
│  │  ├─ 43
│  │  │  └─ c3f30ba4b50bac1076e64935ca341518ff5a6f
│  │  ├─ 45
│  │  │  └─ a1d4dd4531d16baa1fce5d1acb700242214de8
│  │  ├─ 46
│  │  │  └─ 5942de8eee0f9f274f684cea55d066b6f3156c
│  │  ├─ 48
│  │  │  └─ 4ac498e7bca97fc39aa5c236ec2343a3e07a05
│  │  ├─ 4b
│  │  │  └─ 56acfbebf41e17d1ff0dd945bb4c545eae1db1
│  │  ├─ 4c
│  │  │  └─ 56abc35ee326aefeb3a3ef8319a91426762679
│  │  ├─ 4e
│  │  │  ├─ 0ddd1b3b8cd7b54d5ba85d7d06022d3e6bb9fb
│  │  │  └─ 0e761ea567201d96b21146b920451e5f2924e8
│  │  ├─ 4f
│  │  │  └─ 6b39350d7f5c97099c4af26dc323410a62194a
│  │  ├─ 50
│  │  │  ├─ b169539081198dd8355e59907936affc807c38
│  │  │  ├─ cda62332e9474925e819ff946358a9c40d1bf2
│  │  │  └─ ffecc3d14f8e25281976a025aa48e7945e002a
│  │  ├─ 51
│  │  │  └─ 4abf6b267a15b166320bc2f7e6fad57df6fcfc
│  │  ├─ 52
│  │  │  └─ b63a956d4a2dd9cce7c9f37bdd7b8bbeeae001
│  │  ├─ 55
│  │  │  ├─ 54fd5a941dcb071ece7c006604993e2d8b757b
│  │  │  └─ fee5df5d77c70f97a189f6cb62e5012395dc60
│  │  ├─ 57
│  │  │  ├─ 2624fb58dcda4eed76cf0cc8371bced6d045ef
│  │  │  └─ 60cb152d47fd06f47d176ac68ee662181817a4
│  │  ├─ 5a
│  │  │  └─ 53ff637208b11f9c979ceebadeeb98102d01ce
│  │  ├─ 5c
│  │  │  └─ 46d118292cd9ba264aba4755a79a23749e7d82
│  │  ├─ 5f
│  │  │  └─ f247fe5fface51e945baa2587635b3df53d436
│  │  ├─ 60
│  │  │  └─ c3763853432559701008f08880fd33d6596e7a
│  │  ├─ 61
│  │  │  └─ 6d63e54b44b691925e6c1f335d0dbc01583f09
│  │  ├─ 62
│  │  │  ├─ 6458c8904633c7a57b6fd7168038b0f4c38538
│  │  │  └─ cb94b1dedf5e2f2343319a770e27a2bee35942
│  │  ├─ 64
│  │  │  └─ f86c6bd2bb30e3d22e752295eb7c7923fc191e
│  │  ├─ 6a
│  │  │  └─ a5f39efbc00c3155194a57f59aab8cd48ff7f9
│  │  ├─ 6b
│  │  │  ├─ 440f4e215a8faa805ccd1f96c5e75a38df568d
│  │  │  ├─ 698609803b4d2e20b164b8ff773957f3f26abf
│  │  │  └─ ce560cc6fa476465d4f0ad49362b42c12228ab
│  │  ├─ 6c
│  │  │  └─ 8d3f7eabb3d665934e65663ee369a9e347facd
│  │  ├─ 6e
│  │  │  └─ e399db589697d2ecc201b937952fa756cdad10
│  │  ├─ 70
│  │  │  ├─ 0cc96e4638dba9ae56d2b9ba7a202185ff8753
│  │  │  └─ 52d34757ffdbf6d99939bb017cd761c931bcd9
│  │  ├─ 74
│  │  │  └─ f3ec7f45c60b798810a0ee08d98c210820ff8e
│  │  ├─ 78
│  │  │  ├─ 0abaa80f1e6f1281e885e79b2fa81f59fe2758
│  │  │  └─ 594325871b3544251fb223e562de029d2c1d7d
│  │  ├─ 79
│  │  │  ├─ bb0f6137fece87910a03ac901c8272decdabc3
│  │  │  └─ f6dfa7dac144c9b6e2836840e78a4697e4a163
│  │  ├─ 7a
│  │  │  ├─ 9e542b7008729bb6f281344dc10eaa4b297241
│  │  │  └─ bbea3ba50560d036ac3d5b135273de179c23a3
│  │  ├─ 7f
│  │  │  └─ e8b4aedbd5645c1fbd4c9bfd7a1445c742e425
│  │  ├─ 84
│  │  │  └─ 588b5213ad66898535d83864dfb6393419ddbd
│  │  ├─ 89
│  │  │  └─ 78e595f55fe8fc65bc32f7afaf24757d6a9277
│  │  ├─ 8a
│  │  │  └─ 1136335669bd192625bc705cca3562a023428b
│  │  ├─ 8b
│  │  │  └─ 7a427587e7d426e2721c5d4cee789428a45117
│  │  ├─ 90
│  │  │  └─ c94c774df2d112595e09da32b4c327ca690187
│  │  ├─ 92
│  │  │  └─ 7d7cca0badb13577152bf8753ce3552358f53b
│  │  ├─ 94
│  │  │  └─ 15af3e0c5d1c40f5d357cadb0d4ea01c386ee4
│  │  ├─ 95
│  │  │  └─ f5641cf7f33d3e9022c4a60c5f0ff0958d2a4e
│  │  ├─ 97
│  │  │  └─ 8b6cec40df34a01eaf3f4c7a3e4835c6c8cc06
│  │  ├─ 9a
│  │  │  └─ 2df3c822a8e074291ab1443709c29979cefc12
│  │  ├─ a0
│  │  │  └─ 1b32f9438c10ab596e045437df50ef38a0cac5
│  │  ├─ a3
│  │  │  └─ 68fc7b35cfd2320a3b3291010070c60ba57d6b
│  │  ├─ a4
│  │  │  ├─ 6246ba617925c1603e6e716a617c2f4269e87f
│  │  │  └─ 92f104bdce6f0454697c9a3bb1c02a120eddef
│  │  ├─ a6
│  │  │  └─ 9bf3c3a871abb46300f88080bdcbe54d7420fa
│  │  ├─ a7
│  │  │  └─ 74c5360524f8c18b753b6a6d358c226d052a48
│  │  ├─ af
│  │  │  └─ 8c7fc5be5b76c54aa3c2aea0e11628594b911f
│  │  ├─ b0
│  │  │  └─ 10511df49707428d78b733b21aeb0c18f89489
│  │  ├─ b3
│  │  │  ├─ 0b1e30c33bcd0d5be722660b865dda9e9b6cf3
│  │  │  └─ f81c3bec06441c99fcd625db3a9b9ace5b8f53
│  │  ├─ b4
│  │  │  └─ 86963b31019a2aef45334c2f10f5c65120df7e
│  │  ├─ b5
│  │  │  ├─ 1c20aeed6a2bcaaae6cb319cee4d8089bf713a
│  │  │  └─ 2e7fdee006d15c5f0f27257d0d37df71a5b1b1
│  │  ├─ b7
│  │  │  └─ 9c57e0751cca41465793abb2979a140dd741d4
│  │  ├─ b8
│  │  │  └─ b52c333b28fea3d6fca299f5be45cbf169b99b
│  │  ├─ ba
│  │  │  ├─ 51a449222de94e266900a66948e69e39dbd328
│  │  │  └─ e0d9262cfc339b6158f40d53cdb0265865813e
│  │  ├─ bb
│  │  │  └─ b4651f2ee4ae759c6d695a9a2200d6d104bdb5
│  │  ├─ be
│  │  │  └─ 7174ffad97636cfa7f6dfe38c6537533004584
│  │  ├─ c0
│  │  │  └─ 70ae181c8c49b3c8b4c7f16bfdf06483a28216
│  │  ├─ c3
│  │  │  └─ 00a025b1b8a9c088dfee14a20d9b59e054e942
│  │  ├─ c6
│  │  │  └─ af9f0277dd1149d44198bd8bfc384bbcf35d7d
│  │  ├─ c7
│  │  │  ├─ 729be7d401acc58137c98ca7bce74d18a6de17
│  │  │  └─ 831ca77e2f5dcecf0029c0ba1605516b052de8
│  │  ├─ c8
│  │  │  └─ 1453dfe4e0e2f220bc6d592633604b606d617f
│  │  ├─ c9
│  │  │  └─ b33cbedf5c18e29710a9c5ba0818fadb514c2e
│  │  ├─ cb
│  │  │  └─ ceb6224610692f865c3cb86c27bc02a0431183
│  │  ├─ cc
│  │  │  └─ e879ee622146012901c9adb47ef40c0fd3a555
│  │  ├─ d0
│  │  │  └─ 6097da9e895afc8d6dc7bed51cdee3add12b14
│  │  ├─ d6
│  │  │  └─ a02f41c75e7af62630ef386eef4669f24e9a54
│  │  ├─ d9
│  │  │  └─ aa27d0b9ba83865ad4a63e387ede43f79ac971
│  │  ├─ da
│  │  │  └─ ecb0a8e5ab42bb31f73f053163f6be988388be
│  │  ├─ dc
│  │  │  ├─ 52a952e7c1fd6b3fca9da29e1ee6fc04484971
│  │  │  ├─ b72794f5300a3e0ccd2ad0669d802b62f3d370
│  │  │  └─ da777d18a1b4d03249c8816be9e2ab83b83b8e
│  │  ├─ e1
│  │  │  └─ cceec73bf3971f420ce0776d03844e8088b565
│  │  ├─ e2
│  │  │  └─ 7ac38fe60ce436342bac652dce6df5b3ce62b1
│  │  ├─ e3
│  │  │  └─ 16368a2998b69a07365446554c8ab3185a1ae2
│  │  ├─ e4
│  │  │  └─ f593ee5c7a635f6cd051e956d4890da2249931
│  │  ├─ e5
│  │  │  └─ 8b3e9196f8cb50e74c9ef16b30261b28e52919
│  │  ├─ e7
│  │  │  └─ 35f945b6bdd5e31e6f7782a56e91e99ceff96c
│  │  ├─ e8
│  │  │  └─ fad10844261adbce61d1ffb0f42ffdb9277e92
│  │  ├─ e9
│  │  │  └─ d912f3e3cefc18505d3cd19b3a5a9f567f5de0
│  │  ├─ ea
│  │  │  └─ a7f5633f81ac1efd7248be1074daa3bdff856e
│  │  ├─ eb
│  │  │  └─ 77efdffacf95d3f39373a82f63ccdc360e9d35
│  │  ├─ ec
│  │  │  ├─ 868e5ec6971d247970cc772e901bbb77733161
│  │  │  └─ d1ed11db7d16ac2d1628f939a11e1b0e8d34b0
│  │  ├─ ee
│  │  │  ├─ 3db23598d38523f8c92f19461668a9f8a75148
│  │  │  └─ 99b45f456abd299327f2382124a46916f90133
│  │  ├─ f5
│  │  │  └─ aa86c5dc479cee604999f8faa2451b99a56c2b
│  │  ├─ f6
│  │  │  └─ b8437944f6695d2a9cee24bdb1ee8506b02cc5
│  │  ├─ f7
│  │  │  └─ 541ad1e70ae13609dbf10f3fc2d31996b56cbf
│  │  ├─ f8
│  │  │  └─ 47e014837417c10123faf073a649bedc901ec0
│  │  ├─ f9
│  │  │  ├─ 94d9cc1b4eb56e42b11cf29626478a88d297fa
│  │  │  └─ aa683b1ad5cffc76da9ad4b77c562ac4c2b399
│  │  ├─ fb
│  │  │  └─ fbfb3085a4f7c938eb5a05db27df813a687e4e
│  │  ├─ fc
│  │  │  └─ 4d86ad6e76d20febf7fd0d76ba0779b3072522
│  │  ├─ fd
│  │  │  └─ 3dbcbea77cba600c90cb12ab569fdf9c756eb3
│  │  ├─ info
│  │  └─ pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ images
│  ├─ 1727373276854-neckties-210347_1280.jpg
│  ├─ 1727373620524-jeans-428614_1280.jpg
│  ├─ 1727373685608-hero-com2x (1).jpg
│  ├─ 1727373922171-IMG_0783.jpeg
│  ├─ 1727374013679-IMG_0783.jpeg
│  ├─ 1727374037224-IMG_0783.jpeg
│  ├─ 1727374050819-IMG_0783.jpeg
│  ├─ 1727374247881-IMG_0783.jpeg
│  ├─ 1727374271923-IMG_0783.jpeg
│  ├─ 1727375795612-hero.jpg
│  ├─ 1727375843947-cat.jpg
│  ├─ 1727797800918-IMG_0011.JPG
│  ├─ 1727797832933-pollen2.jpg
│  ├─ 1727806690823-hero.jpg
│  ├─ ae2711ebcb.jpg
│  ├─ beeShop.jpg
│  ├─ bruno-kelzer-LvySG1hvuzI-unsplash.jpg
│  ├─ hero-com2x (1).jpg
│  ├─ hero-com2x.jpg
│  ├─ pollen.jpg
│  ├─ pxfuel (2).jpg
│  └─ Shtanko.jpg
├─ pnpm-lock.yaml
├─ README.md
├─ src
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ decorators
│  │  │  └─ roles.decorator.ts
│  │  ├─ dto
│  │  │  ├─ auth-user.dto.ts
│  │  │  └─ index.ts
│  │  └─ guards
│  │     ├─ auth.guard.ts
│  │     ├─ jwt.strategy.ts
│  │     └─ roles.guard.ts
│  ├─ chat
│  │  ├─ chat.module.ts
│  │  ├─ chat.service.ts
│  │  ├─ dto
│  │  │  ├─ active-conversation.dto.ts
│  │  │  ├─ conversation.dto.ts
│  │  │  └─ message.dto.ts
│  │  ├─ entities
│  │  │  ├─ active-conversation.ts
│  │  │  ├─ conversation.entity.ts
│  │  │  └─ message.entity.ts
│  │  └─ gateway
│  │     └─ chat.gateway.ts
│  ├─ main.ts
│  ├─ posts
│  │  ├─ dto
│  │  │  └─ post.dto.ts
│  │  ├─ entities
│  │  │  └─ post.entity.ts
│  │  ├─ guards
│  │  │  └─ is-creator.guard.ts
│  │  ├─ posts.controller.ts
│  │  ├─ posts.module.ts
│  │  └─ posts.service.ts
│  ├─ shared
│  │  ├─ firebase
│  │  │  └─ firebase.service.ts
│  │  └─ interceptors
│  │     ├─ createUser.interceptor.ts
│  │     └─ index.ts
│  └─ users
│     ├─ dto
│     │  ├─ create-user.dto.ts
│     │  ├─ friend-request.dto.ts
│     │  └─ role.dto.ts
│     ├─ entities
│     │  ├─ friend-request.entity.ts
│     │  └─ user.entity.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     └─ users.service.ts
└─ test
   └─ app.e2e-spec.ts

```