package com.simplyatx.movies.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewsController {
    @RequestMapping(value={"/privacyPolicy"})
    public String privacyPolicy() { return "privacyPolicy"; }

}
