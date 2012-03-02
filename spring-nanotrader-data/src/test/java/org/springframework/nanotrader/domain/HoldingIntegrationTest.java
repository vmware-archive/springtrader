package org.springframework.nanotrader.domain;

import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.repository.HoldingRepository;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;


@Configurable
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml")
@Transactional
public class HoldingIntegrationTest {

    @Test
    public void testMarkerMethod() {
    }

	@Autowired
    private HoldingDataOnDemand dod;

	@Autowired
    HoldingRepository holdingRepository;

	@Test
    public void testCount() {
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", dod.getRandomHolding());
        long count = holdingRepository.count();
        Assert.assertTrue("Counter for 'Holding' incorrectly reported there were no entries", count > 0);
    }

	@Test
    public void testFind() {
        Holding obj = dod.getRandomHolding();
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", obj);
        Integer id = obj.getHoldingid();
        Assert.assertNotNull("Data on demand for 'Holding' failed to provide an identifier", id);
        obj = holdingRepository.findOne(id);
        Assert.assertNotNull("Find method for 'Holding' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Holding' returned the incorrect identifier", id, obj.getHoldingid());
    }

	@Test
    public void testFindAll() {
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", dod.getRandomHolding());
        long count = holdingRepository.count();
        Assert.assertTrue("Too expensive to perform a find all test for 'Holding', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Holding> result = holdingRepository.findAll();
        Assert.assertNotNull("Find all method for 'Holding' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Holding' failed to return any data", result.size() > 0);
    }

	@Test
    public void testFindEntries() {
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", dod.getRandomHolding());
        long count = holdingRepository.count();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Holding> result = holdingRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
        Assert.assertNotNull("Find entries method for 'Holding' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Holding' returned an incorrect number of entries", count, result.size());
    }

	@Test
    public void testSave() {
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", dod.getRandomHolding());
        Holding obj = dod.getNewTransientHolding(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Holding' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Holding' identifier to be null", obj.getHoldingid());
        holdingRepository.save(obj);
        holdingRepository.flush();
        Assert.assertNotNull("Expected 'Holding' identifier to no longer be null", obj.getHoldingid());
    }

	@Test
    public void testDelete() {
        Holding obj = dod.getRandomHolding();
        Assert.assertNotNull("Data on demand for 'Holding' failed to initialize correctly", obj);
        Integer id = obj.getHoldingid();
        Assert.assertNotNull("Data on demand for 'Holding' failed to provide an identifier", id);
        obj = holdingRepository.findOne(id);
        holdingRepository.delete(obj);
        holdingRepository.flush();
        Assert.assertNull("Failed to remove 'Holding' with identifier '" + id + "'", holdingRepository.findOne(id));
    }
}
