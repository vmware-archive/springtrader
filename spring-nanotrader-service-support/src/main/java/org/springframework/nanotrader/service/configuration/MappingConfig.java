package org.springframework.nanotrader.service.configuration;

import java.util.ArrayList;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MappingConfig {
		@Bean
		public Mapper mapper() {
			DozerBeanMapper mapper = new DozerBeanMapper();
			List<String> mappingFiles = new ArrayList<String>();
			mappingFiles.add("dozer-bean-mappings.xml");
			mapper.setMappingFiles(mappingFiles);
			return mapper;
		}
}
