package com.jim.spring;

import java.io.InputStream;
import java.util.Arrays;
import java.util.Properties;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.websocket.server.ServerEndpoint;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);

        System.out.println("Let's inspect the beans provided by Spring Boot:" + ctx.getId());

    }

    @Bean
    public Resource resource() {
        return new ClassPathResource("configure.properties");
    }

    @Bean
    public Properties properties() {
        Properties p = new Properties();
        try {
            InputStream in = resource().getInputStream();

            p.load(in);
            return p;
        } catch (Exception ex) {
            return p;
        }
    }


    @Bean
    public HikariDataSource dataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setConnectionTestQuery("SELECT 1 FROM DUAL");
        Properties p = properties();
        ds.setDataSourceClassName(p.getProperty("jdbc.dataSourceClassName"));
        ds.setMinimumIdle(Integer.parseInt(p.getProperty("cp.minIdle")));
        ds.setMaximumPoolSize(Integer.parseInt(p.getProperty("cp.maxTotal")));
        ds.setIdleTimeout(Long.parseLong(p.getProperty("cp.idleTimeout")));
        ds.setConnectionTimeout(Long.parseLong(p.getProperty("cp.maxWaitMillis")));

        Properties ps = new Properties();
        ps.setProperty("url", p.getProperty("jdbc.url"));
        ps.setProperty("user", p.getProperty("jdbc.username"));
        ps.setProperty("password", p.getProperty("jdbc.password"));
        ds.setDataSourceProperties(ps);
        return ds;

    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        JdbcTemplate jt = new JdbcTemplate();
        jt.setDataSource(dataSource());
        return jt;
    }
}
