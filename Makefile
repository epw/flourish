install:
	(find . -name '*.html' -or -name '*.css' -or -name '*.js' -or -name '*.cgi'; echo $(HOME)/www/flourish/.) | xargs cp

clean:
	(find $(HOME)/www/flourish/ -name '*.html' -or -name '*.css' -or -name '*.js' -or -name '*.cgi') | xargs rm
