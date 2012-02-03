package org.springframework.nanotrader.domain;

import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.repository.AccountProfileRepository;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@Configurable
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml")
@Transactional
public class AccountprofileIntegrationTest {

    @Test
    public void testMarkerMethod() {
    }

	@Autowired
    private AccountprofileDataOnDemand dod;

	@Autowired
    AccountProfileRepository accountProfileRepository;

	@Test
    public void testCount() {
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", dod.getRandomAccountprofile());
        long count = accountProfileRepository.count();
        Assert.assertTrue("Counter for 'Accountprofile' incorrectly reported there were no entries", count > 0);
    }

	@Test
    public void testFind() {
        Accountprofile obj = dod.getRandomAccountprofile();
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", obj);
        Integer id = obj.getProfileid();
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to provide an identifier", id);
        obj = accountProfileRepository.findOne(id);
        Assert.assertNotNull("Find method for 'Accountprofile' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Accountprofile' returned the incorrect identifier", id, obj.getProfileid());
    }

	@Test
    public void testFindAll() {
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", dod.getRandomAccountprofile());
        long count = accountProfileRepository.count();
        Assert.assertTrue("Too expensive to perform a find all test for 'Accountprofile', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Accountprofile> result = accountProfileRepository.findAll();
        Assert.assertNotNull("Find all method for 'Accountprofile' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Accountprofile' failed to return any data", result.size() > 0);
    }

	@Test
    public void testFindEntries() {
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", dod.getRandomAccountprofile());
        long count = accountProfileRepository.count();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Accountprofile> result = accountProfileRepository.findAll(new org.springframework.data.domain.PageRequest(firstResult / maxResults, maxResults)).getContent();
        Assert.assertNotNull("Find entries method for 'Accountprofile' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Accountprofile' returned an incorrect number of entries", count, result.size());
    }

	@Test
    public void testSave() {
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", dod.getRandomAccountprofile());
        Accountprofile obj = dod.getNewTransientAccountprofile(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Accountprofile' identifier to be null", obj.getProfileid());
        accountProfileRepository.save(obj);
        accountProfileRepository.flush();
        Assert.assertNotNull("Expected 'Accountprofile' identifier to no longer be null", obj.getProfileid());
    }

	@Test
    public void testDelete() {
        Accountprofile obj = dod.getRandomAccountprofile();
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to initialize correctly", obj);
        Integer id = obj.getProfileid();
        Assert.assertNotNull("Data on demand for 'Accountprofile' failed to provide an identifier", id);
        obj = accountProfileRepository.findOne(id);
        accountProfileRepository.delete(obj);
        accountProfileRepository.flush();
        Assert.assertNull("Failed to remove 'Accountprofile' with identifier '" + id + "'", accountProfileRepository.findOne(id));
    }
}
