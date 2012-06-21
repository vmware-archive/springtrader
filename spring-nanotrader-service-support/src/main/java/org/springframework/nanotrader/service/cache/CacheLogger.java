package org.springframework.nanotrader.service.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.gemstone.gemfire.cache.EntryEvent;
import com.gemstone.gemfire.cache.util.CacheListenerAdapter;

/**
 * @author Brian Dussault
 *
 */

public class CacheLogger extends CacheListenerAdapter<Object, Object> {

	private static Logger log = LoggerFactory.getLogger(CacheLogger.class);

	@Override
	public void afterCreate(EntryEvent<Object, Object> event) {
		log.debug("CacheLogger.afterCreate(): Added " + messageLog(event) + " to the cache");
	}

	@Override
	public void afterDestroy(EntryEvent<Object, Object> event) {
		log.debug("CacheLogger.afterDestroy(): Removed " + messageLog(event) + " from the cache");
	}

	@Override
	public void afterUpdate(EntryEvent<Object, Object> event) {
		log.debug("CacheLogger.afterUpdate(): Updated " + messageLog(event) + " in the cache");
	}

	private String messageLog(EntryEvent<Object, Object> event) {
		Object key = event.getKey();
		Object value = event.getNewValue();

		if (event.getOperation().isUpdate()) {
			return "[" + key + "] from [" + event.getOldValue() + "] to ["
					+ event.getNewValue() + "]";
		}
		return "[" + key + "=" + value + "]";
	}
}
