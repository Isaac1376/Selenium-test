import os
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class StorefrontSmokeTest(unittest.TestCase):
    def click_visible(self, selector):
        element = self.driver.find_element(By.CSS_SELECTOR, selector)
        self.driver.execute_script(
            'arguments[0].scrollIntoView({block: "center", inline: "nearest", behavior: "instant"});',
            element,
        )
        element.click()
        return element

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless=new')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1440,1000')
        cls.driver = webdriver.Chrome(options=options)
        cls.wait = WebDriverWait(cls.driver, 10)
        cls.driver.get(os.getenv('STOREFRONT_URL', 'http://127.0.0.1:5173/'))

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_shopping_flow_and_responsive_layout(self):
        driver = self.driver
        wait = self.wait

        self.assertEqual(driver.title, 'Good Things Market | Fresh, on your time')
        self.assertEqual(len(driver.find_elements(By.CSS_SELECTOR, '.product-card')), 10)

        self.click_visible('[data-category="Bakery"]')
        wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, '.product-card'), 'Country sourdough'))
        self.assertIn('Country sourdough', driver.find_element(By.CSS_SELECTOR, '.product-card').text)

        self.click_visible('[data-category="Everything"]')
        search = driver.find_element(By.ID, 'product-search')
        search.send_keys('avocado')
        wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, '.product-card'), 'Ready-to-eat avocados'))
        self.assertIn('Ready-to-eat avocados', driver.find_element(By.CSS_SELECTOR, '.product-card').text)
        search.send_keys(Keys.CONTROL, 'a', Keys.BACKSPACE)
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-add="strawberries"]')))

        self.click_visible('[data-add="strawberries"]')
        self.assertEqual(driver.find_element(By.CSS_SELECTOR, '.cart-count').text, '1')
        self.click_visible('.cart-toggle')
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.cart-panel.is-open')))
        self.assertIn('Peak-season strawberries', driver.find_element(By.CSS_SELECTOR, '.cart-items').text)
        self.assertEqual(driver.find_element(By.CSS_SELECTOR, '.subtotal strong').text, '$5.49')

        self.click_visible('[data-quantity="strawberries"][data-change="1"]')
        self.assertEqual(driver.find_element(By.CSS_SELECTOR, '.cart-count').text, '2')
        self.assertEqual(driver.find_element(By.CSS_SELECTOR, '.subtotal strong').text, '$10.98')

        driver.refresh()
        wait.until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, '.cart-count'), '2'))
        self.click_visible('.cart-toggle')
        self.click_visible('.checkout-button')
        driver.find_element(By.NAME, 'name').send_keys('Taylor Neighbor')
        driver.find_element(By.NAME, 'address').send_keys('12 Market Street')
        driver.find_element(By.NAME, 'email').send_keys('taylor@example.com')
        self.click_visible('.checkout-form button[type="submit"]')
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.cart-confirmation')))
        self.assertRegex(driver.find_element(By.CSS_SELECTOR, '.order-number').text, r'^GT-\d{6}$')
        self.assertEqual(driver.find_element(By.CSS_SELECTOR, '.cart-count').text, '0')

        self.click_visible('.cart-close')
        floating_item = self.click_visible('.float-orange')
        self.assertIn('is-popped', floating_item.get_attribute('class'))

        email = driver.find_element(By.ID, 'email-address')
        email.send_keys('neighbor@example.com')
        self.click_visible('#newsletter-form button')
        self.assertIn('You’re on the list', driver.find_element(By.CSS_SELECTOR, '.newsletter-status').text)

        driver.set_window_size(390, 844)
        self.assertLessEqual(
            driver.execute_script('return document.documentElement.scrollWidth'),
            driver.execute_script('return window.innerWidth'),
        )


if __name__ == '__main__':
    unittest.main()