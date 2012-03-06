package org.springframework.nanotrader.domain;

import java.math.BigDecimal;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.nanotrader.domain.test.AccountDataOnDemand;
import org.springframework.nanotrader.repository.AccountRepository;
import org.springframework.nanotrader.service.AccountService;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@Configurable
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/spring/applicationContext*.xml")
@Transactional
public class AccountIntegrationTest {

	
    @Test
    public void testMarkerMethod() {
    }

	@Autowired
    private AccountDataOnDemand dod;

	@Autowired
    AccountService accountService;

	@Autowired
    AccountRepository accountRepository;

	@Test
    public void testCountAllAccounts() {
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", dod.getRandomAccount());
        long count = accountService.countAllAccounts();
        Assert.assertTrue("Counter for 'Account' incorrectly reported there were no entries", count > 0);
    }

	@Test
    public void testFindAccount() {
        Account obj = dod.getRandomAccount();
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", obj);
        Integer id = obj.getAccountid();
        Assert.assertNotNull("Data on demand for 'Account' failed to provide an identifier", id);
        obj = accountService.findAccount(id);
        Assert.assertNotNull("Find method for 'Account' illegally returned null for id '" + id + "'", obj);
        Assert.assertEquals("Find method for 'Account' returned the incorrect identifier", id, obj.getAccountid());
    }

	@Test
    public void testFindAllAccounts() {
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", dod.getRandomAccount());
        long count = accountService.countAllAccounts();
        Assert.assertTrue("Too expensive to perform a find all test for 'Account', as there are " + count + " entries; set the findAllMaximum to exceed this value or set findAll=false on the integration test annotation to disable the test", count < 250);
        List<Account> result = accountService.findAllAccounts();
        Assert.assertNotNull("Find all method for 'Account' illegally returned null", result);
        Assert.assertTrue("Find all method for 'Account' failed to return any data", result.size() > 0);
    }

	@Test
    public void testFindAccountEntries() {
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", dod.getRandomAccount());
        long count = accountService.countAllAccounts();
        if (count > 20) count = 20;
        int firstResult = 0;
        int maxResults = (int) count;
        List<Account> result = accountService.findAccountEntries(firstResult, maxResults);
        Assert.assertNotNull("Find entries method for 'Account' illegally returned null", result);
        Assert.assertEquals("Find entries method for 'Account' returned an incorrect number of entries", count, result.size());
    }

	@Test
    public void testSaveAccount() {
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", dod.getRandomAccount());
        Account obj = dod.getNewTransientAccount(Integer.MAX_VALUE);
        Assert.assertNotNull("Data on demand for 'Account' failed to provide a new transient entity", obj);
        Assert.assertNull("Expected 'Account' identifier to be null", obj.getAccountid());
        accountService.saveAccount(obj);
        accountRepository.flush();
        Assert.assertNotNull("Expected 'Account' identifier to no longer be null", obj.getAccountid());
    }

	@Test
    public void testDeleteAccount() {
        Account obj = dod.getRandomAccount();
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", obj);
        Integer id = obj.getAccountid();
        Assert.assertNotNull("Data on demand for 'Account' failed to provide an identifier", id);
        obj = accountService.findAccount(id);
        accountService.deleteAccount(obj);
        accountRepository.flush();
        Assert.assertNull("Failed to remove 'Account' with identifier '" + id + "'", accountService.findAccount(id));
    }

	@Test
    public void testUpdateAccount() {
        Account obj = dod.getRandomAccount();
        Assert.assertNotNull("Data on demand for 'Account' failed to initialize correctly", obj);
        Integer id = obj.getAccountid();
        Assert.assertNotNull("Data on demand for 'Account' failed to provide an identifier", id);
        obj = accountService.findAccount(id);
        obj.setOpenbalance(new BigDecimal(1.1));
        accountService.updateAccount(obj);
        accountRepository.flush();
        Account updated = accountService.findAccount(id);
        Assert.assertEquals("Update failed", new BigDecimal(1.1), updated.getOpenbalance());
    }

}
