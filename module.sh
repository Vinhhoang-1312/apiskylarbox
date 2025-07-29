#!/bin/bash
if [ -z "$1" ]; then
  echo "Module Name!"
  echo "Ví dụ: module.sh user"
  exit 1
fi

MODULE_NAME=$1

nest g mo modules/$MODULE_NAME --no-spec
nest g co modules/$MODULE_NAME --no-spec
nest g s modules/$MODULE_NAME --no-spec

mkdir -p src/modules/$MODULE_NAME/dto
mkdir -p src/modules/$MODULE_NAME/repositories
mkdir -p src/modules/$MODULE_NAME/schemas

touch src/modules/$MODULE_NAME/dto/$MODULE_NAME.dto.ts
touch src/modules/$MODULE_NAME/repositories/$MODULE_NAME.repository.ts
touch src/modules/$MODULE_NAME/schemas/$MODULE_NAME.schema.ts

echo "Đã tạo module, controller, service, và các thư mục dto, repositories, schema cho $MODULE_NAME!"
