package com.yueyoumap.core;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet("/")
public class Test extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        /* 设置响应内容类型 */
        res.setContentType("text/html; charset=UTF-8");

        /* 设置逻辑实现 */
        PrintWriter out = res.getWriter();
        out.println("test");
    }
}
