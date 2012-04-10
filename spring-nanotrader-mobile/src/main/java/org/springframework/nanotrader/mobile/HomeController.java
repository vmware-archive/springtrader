package org.springframework.nanotrader.mobile;

import org.springframework.mobile.device.site.SitePreference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	/**
	 * Show the home page to the user.
	 * Declares a {@link SitePreference} parameter to show how you can resolve the user's site preference.
	 * This controller renders a different version of the home view if the user has a mobile site preference.
	 */
	@RequestMapping("/")
	public String home(SitePreference sitePreference, Model model) {
		if (sitePreference == SitePreference.MOBILE) {
			return "home-mobile";
		} else {
			return "home";
		}
	}

}
