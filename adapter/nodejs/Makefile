NODE=$(shell which node 2> /dev/null)
NPM=$(shell which npm 2> /dev/null)
YARN=$(shell which yarn 2> /dev/null)
JQ=$(shell which jq 2> /dev/null)

APP_NAME=${shell jq ".name" package.json}
CURRENT_VERSION:=$(shell jq ".version" package.json)
PKM?=$(if $(YARN),$(YARN),$(shell which npm))

TSCONFIG_BUILD_PATH=./tsconfig.build.json
COMPILE_DIR=dist
BUILD_DIR=.bin

help: info
	@echo
	@echo "List of commands:"
	@echo
	@echo "  make info             - display node, npm and yarn versions."
	@echo "  make deps             - install all dependencies."
	@echo "  make compile          - compile source using build configuration."
	@echo "  make build-bin        - build executables."
	@echo "  make clean            - clean all artifacts."

info:
	@[ ! -z "$(NODE)" ] && echo node version: `$(NODE) --version` "$(NODE)"
	@[ ! -z "$(PKM)"  ] && echo $(shell basename $(PKM)) version: `$(PKM) --version` "$(PKM)"
	@[ ! -z "$(JQ)"   ] && echo jq version: `$(JQ) --version` "$(JQ)"

	@echo
	@echo "Name: $(APP_NAME)"
	@echo "Current version: $(CURRENT_VERSION)"

deps:
	@$(PKM) install

compile: deps clean
	@echo "Compiling source ..."
	@tsc -p $(TSCONFIG_BUILD_PATH)

build-bin: compile
	@echo "Building executable binary ..."
	@pkg . --out-path $(BUILD_DIR)

clean:
	@echo "Cleaning artifacts ..."
	@if [ -d $(BUILD_DIR)   ]; then rm -r $(BUILD_DIR); fi
	@if [ -d $(COMPILE_DIR) ]; then rm -r $(COMPILE_DIR); fi
