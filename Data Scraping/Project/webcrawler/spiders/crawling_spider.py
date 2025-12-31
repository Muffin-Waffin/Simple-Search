from pathlib import Path
import scrapy
from webcrawler.start_url import start_urls as urls

class CrawlingSpider(scrapy.Spider):
    name = "books"
    allowed_domains =  ["books.toscrape.com"]
    start_urls = urls
    # custom_settings = {
    #     'DEPTH_LIMIT' : 3,
    # }

    def parse(self,response):
        book_card = response.css("li.col-md-3")

        for book in book_card:
            yield {'name' : book.css('.product_pod h3 a::text').get(default=''),
                    'price' : book.css('.product_pod .product_price p::text').get(default=''),
                    'link': response.urljoin(book.css('.product_pod .image_container a::attr(href)').get(default=''))}
            
        next_page = response.css("li.next a::attr(href)").get()

        if next_page:
            yield response.follow(next_page ,callback=self.parse)    

        # used this whole thinsmg to just get the all strating crawrl links 
        # page = response.url.split("/")[-2]
        # filename = f"default.txt"
        # with open(filename , "a") as file:
        #     file.write(response.url)
        # # Path(filename).write_text(response.url, encoding='utf-8')
        # self.log(f"Saved file {filename}")


        # catagory = response.css('div.side_categories')
        # all_page = catagory.css('a::attr(href)').getall()
        # for page in all_page:
        #     url = response.urljoin(page)
        #     yield {'link' : url}
        # self.log(f"Saved file")





