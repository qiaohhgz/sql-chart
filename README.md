# Chart - SQL

> [Demo](http://qiaohhgz.github.io/sql-chart/client/charts.html)
Link: http://qiaohhgz.github.io/sql-chart/client/charts.html

### Step 1:

下载项目 server 工程

在 configure.properties中配置你的数据库地址

```properties
jdbc.dataSourceClassName=
jdbc.url=
jdbc.username=
jdbc.password=
```

可以在 application.yml 中配置默认的默认的查询 

```yaml
server:
     port: 5080
chart:
     sqls:
        - select '名称-1' name,count(*) num
          from test
        - select '名称-2' name,count(*) num
          from test
```

### Step 2:

启动server 项目

### Step 3:

打开 http://qiaohhgz.github.io/sql-chart/client/charts.html

在 服务器后面的输入框中填入你的 服务地址 比如：http://localhost:5080/server








