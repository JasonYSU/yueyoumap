package com.yueyoumap.core;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.Base64;
import java.util.HashMap;

import com.baidu.aip.imageclassify.AipImageClassify;
import org.json.JSONException;
import org.json.JSONObject;
import sun.misc.BASE64Encoder;

@MultipartConfig(location = "/tmp", maxFileSize = 4194304L)
@WebServlet(name = "RecognizePlants", urlPatterns = {"/RecognizePlants"}, loadOnStartup = 1)
public class RecognizePlants extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("text/html; charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("Please use POST method");
    }

    /** 处理POST请求.
     *
     * @param req 请求对象
     * @param res 返回对象，body为json字符串，有message和result两个字段，message为处理情况，result为识别结果
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        res.setContentType("text/json; charset=UTF-8");
        PrintWriter out = res.getWriter();
        /* 处理上传的文件 */
        String fileName;
        String fileType;
        try {
            Part part = req.getPart("file");
            fileName = part.getSubmittedFileName();
            fileType = part.getContentType();
            /* 文件类型不符合 */
            if (!fileType.contains("jpg") && !fileType.contains("png") && fileType.contains("bmp")) {
                res.setHeader("Status", "400");
                out.println("{\"message\": " +
                        "\"请上传.jpg/.bmp/.png格式的图片\", \"result\": \"\"}");
                return;
            }
            part.write(part.getSubmittedFileName());
        } catch (NullPointerException e) {
            res.setHeader("Status", "400");
            out.println("{\"message\": " +
                    "\"服务器出错\", \"result\": \"\"}");
            return;
        }
        String filePath = "/tmp/" + fileName;
        // String encodedFile = file2Base64(filePath, res);
        String results = recognizePlants(filePath);
        out.println("{\"message\": \"识别成功\"," +
                "\"result\": " + results + "}");
        // System.out.println(results);
    }

    /*
    private String file2Base64(String filePath, HttpServletResponse res) throws IOException {
        InputStream inputStream;
        PrintWriter out = res.getWriter();
        byte[] buffer;
        try {
            inputStream = new FileInputStream(filePath);
            buffer = new byte[inputStream.available()];
            inputStream.read(buffer);
            inputStream.close();
        } catch (FileNotFoundException e) {
            res.setHeader("Status", "500");
            out.println("{\"status\": false, \"message\": " +
                    "\"服务器出错\"}");
            return "文件不存在";
        } catch (IOException e) {
            res.setHeader("Status", "500");
            out.println("{\"status\": false, \"message\": " +
                    "\"服务器出错\"}");
            return "服务器发生错误";
        }
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(buffer);
    }
    */

    /** 调用百度AI SDK识别植物.
     *
     * @param filePath 文件路径
     * @return String 识别结果，json格式的字符串
     */
    private String recognizePlants(String filePath) {
        /* 请将appId、apiKey、secretKey设置为相应值 */
        final String appId = "appId";
        final String apiKey = "apiKey";
        final String secretKey = "secretKey";
        AipImageClassify client = new AipImageClassify(appId, apiKey, secretKey);
        HashMap<String, String> options = new HashMap<>();
        JSONObject res = client.plantDetect(filePath, options);
        String results;
        try {
            results = res.getJSONObject("result").toString();
            results = "[" +results + "]";
        } catch (JSONException notJSONObject) {
            try {
                results = res.getJSONArray("result").toString();
            } catch (JSONException notJSONArray) {
                System.out.println("JSON Exception");
                results = "\"\"";
            }
        }
        return results;
    }
}
