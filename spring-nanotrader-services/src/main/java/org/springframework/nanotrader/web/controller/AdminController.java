/**
 * 
 */
package org.springframework.nanotrader.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.domain.ProgressData;
import org.springframework.nanotrader.service.domain.RecreateData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Ilayaperumal Gopinathan
 * 
 */
@Controller
public class AdminController extends BaseController {

	@RequestMapping(value = "/recreateData", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void recreateData(@RequestBody
	RecreateData recreateDataRequest) {
		this.getAdminServiceFacade().recreateData(Integer.parseInt(recreateDataRequest.getUsercount()));
	}

	@RequestMapping(value = "/recreateData", method = RequestMethod.GET)
	@ResponseBody
	public ProgressData getProgress() {
		ProgressData progress = new ProgressData();
		progress.setUsercount(this.getAdminServiceFacade().getProgressCount());
		return progress;
	}
}
