package com.jim.spring.services;

import java.util.List;

/**
 * Created by qiao on 15/6/20.
 */
public interface MonitorServices {

    List getData(String sql);

    List<String> getChartSqls();
}
