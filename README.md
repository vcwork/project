
## Hacking

Install the [gohugo](https://gohugo.io/) [static site generator](https://jamstack.org/generators/) then:

```sh
$git clone https://github.com/vcwork/project
$cd showcase
$git submodule update --init --recursive
$hugo server -D --disableFastRender
```

Deploy with `$git push` after redefined `baseURL` in `config.toml` which should point to your actual public remote.

Note that the **showcase** template uses the [hugo-book](https://github.com/alex-shpak/hugo-book) theme by default. Check the [hugo themes site](https://themes.gohugo.io/) if you wish to add other ones.
