OSACOMPILE?= osacompile
OSACOMPILEFLAGS?= -l JavaScript

SOURCES = default.js evernote.js
COMPILED = $(SOURCES:.js=.scpt)

# all: default.scpt evernote.scpt

all: $(SOURCES) $(COMPILED)

.SUFFIXES: .scpt .js

.js.scpt:
	${OSACOMPILE} ${OSACOMPILEFLAGS} -o $@ $?

clean:
	rm -f $(COMPILED)
