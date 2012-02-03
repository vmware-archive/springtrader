/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.nanotrader.util;

import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.orm.jpa.persistenceunit.MutablePersistenceUnitInfo;
import org.springframework.orm.jpa.persistenceunit.PersistenceUnitPostProcessor;

/**
 * Work around for gradle/spring issue with location of the persistence.xml.
 *
 * @author Gary Russell
 *
 */
public class PUPostProcessor implements PersistenceUnitPostProcessor {

	@Override
	public void postProcessPersistenceUnitInfo(MutablePersistenceUnitInfo pui) {
		String url = pui.getPersistenceUnitRootUrl().toString();
		if (url.contains("resources/main")) {
			try {
				pui.setPersistenceUnitRootUrl(new URL(url.replaceAll("resources/main", "classes/main")));
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
		}
	}

}
