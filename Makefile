.PHONY: build clean upload
build:
	npm install --only=production
	zip -r code.zip . -x *.git*

clean:
	if [ -a code.zip ]; then rm code.zip; fi

upload: build
	./upload.sh
