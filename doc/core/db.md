Blog核心框架：数据库部分
========================

数据库采用MongoDB，因为比MySQL简单。

实验了一下，感觉还是ODM好用，于是用了Mongoose。和通常的行为不同，每一个app需要的Model并没有放在相应的app目录下，而是放在`core/db/schemas`下。Schema都在这个目录下面定义，框架会在启动的时候自动把这些定义了Schema的文件加载起来。

`core/db/utils.js`定义了一些工具函数，目前而言只有一个函数有用。`autoDiscoverSchemas`用于加载`core/db/schemas`下的Schema，在启动脚本中已经加载。

Schema规范
----------
Schema文件统一放在`core/db/schemas`下，不需要每一个Schema单独一个文件。Schema文件中只应该定义mongoose的Schema并且生成Modle。在app中使用Model的时候，不需要require相应文件，直接通过`mongoose.model`获取相应Model即可。