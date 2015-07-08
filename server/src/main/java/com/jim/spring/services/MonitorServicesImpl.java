package com.jim.spring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by qiao on 15/6/20.
 */
@Service
@ConfigurationProperties(prefix = "chart", locations = {"classpath*:application.yml"})
public class MonitorServicesImpl implements MonitorServices {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private List<String> sqls;

    @Override
    public List getData(String sql) {
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);

        return maps;
    }

    @Override
    public List<String> getChartSqls() {
        return sqls;
    }

    public List<String> getSqls() {
        return sqls;
    }

    public void setSqls(List<String> sqls) {
        this.sqls = sqls;
    }
}
