package com.jim.spring.controller;

import com.jim.spring.services.MonitorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Created by qiao on 15/6/20.
 */
@RestController
public class MonitorController {

    @Autowired
    private MonitorServices monitorServices;

    @RequestMapping("/data")
    public List<Map<String, Objects>> data(@RequestBody String sql) throws Exception {
        if(sql == null || sql.length() == 0) throw new NullPointerException("sql参数不能为空");
        sql = URLDecoder.decode(sql, "utf-8");
        return monitorServices.getData(sql);
    }

    @RequestMapping("/charts")
    public List<String> charts(){
        return monitorServices.getChartSqls();
    }
}
