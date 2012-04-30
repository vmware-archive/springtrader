/**
 * 
 */
package org.springframework.nanotrader.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class AdminController extends BaseController {

	@RequestMapping(value = "/recreateData", method = RequestMethod.POST)
	@ResponseBody
	public void recreateData(@RequestParam(value = "count", required = true) String count) {
		this.getAdminServiceFacade().recreateData(Integer.parseInt(count));
	}
}
