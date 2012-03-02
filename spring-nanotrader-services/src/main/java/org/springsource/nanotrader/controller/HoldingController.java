package org.springsource.nanotrader.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.dozer.Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.nanotrader.service.TradingService;
import org.springframework.nanotrader.service.domain.Holding;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springsource.nanotrader.exception.NoRecordsFoundException;

/**
 *  Provides JSON based REST api to Holdings repository
 *  
 *  @author Brian Dussault 
 *  @author
 */

@Controller
public class HoldingController {
	private static Logger log = LoggerFactory.getLogger(HoldingController.class);
	private static String HOLDING_MAPPING = "holding";
	@Resource
	private TradingService tradingService;
	
	@Resource
	private Mapper mapper;
	
	@RequestMapping(value = "/{accountId}/holding/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Holding find(@PathVariable( "id" ) final Integer id ) throws NoRecordsFoundException {
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.find: id=" + id);
		}
		org.springframework.nanotrader.domain.Holding holding = null;
		Holding holdingResponse = new Holding();
		holding = tradingService.findHolding(id);
		if (holding == null) { 
			throw new NoRecordsFoundException();
		}
		mapper.map(holding, holdingResponse);
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.find - after service call. Payload is: " + holdingResponse);
		}
		
		return holdingResponse;
	}
	
	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.GET)
	@ResponseBody
	public List<Holding> findByAccountId(@PathVariable( "accountId" ) final Integer accountId ) throws NoRecordsFoundException {
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.find: id=" + accountId);
		}
		List<Holding> holdingResponse = new ArrayList<Holding>();
		List<org.springframework.nanotrader.domain.Holding> holdings = tradingService.findHoldingsByAccountId(accountId);
		if (holdings == null ||  holdings.size() == 0) { 
			throw new NoRecordsFoundException();
		}
		for(org.springframework.nanotrader.domain.Holding h: holdings) { 
			Holding holding = new Holding();
			mapper.map(h, holding, HOLDING_MAPPING);
			holdingResponse.add(holding);
		}
		
		
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.findByAccountId completed");
		}
		
		return holdingResponse;
	}

	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public void save(@RequestBody Holding holdingRequest) {
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.save:" + holdingRequest.toString());
		}
		org.springframework.nanotrader.domain.Holding holding = new org.springframework.nanotrader.domain.Holding();
		mapper.map(holdingRequest, holding);
		tradingService.saveHolding(holding);
	}

	@RequestMapping(value = "/{accountId}/holding/", method = RequestMethod.PUT)
	@ResponseStatus( HttpStatus.OK )
	public void update(@RequestBody Holding holdingRequest) {
		if (log.isDebugEnabled()) { 
			log.debug("HoldingController.update:" + holdingRequest.toString());
		}
		org.springframework.nanotrader.domain.Holding holding = new org.springframework.nanotrader.domain.Holding();
		mapper.map(holdingRequest, holding);
		tradingService.updateHolding(holding);
		
	}
	
}
