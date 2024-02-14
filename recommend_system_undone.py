export PGCLIENTENCODING=utf-8
from pyspark.sql import SparkSession
spark = SparkSession.builder.appName("chapter2")\
        .config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.12:3.0.1')\
        .getOrCreate()
sqlContext = SparkSession(spark)
#Dont Show warning only error
spark.sparkContext.setLogLevel("ERROR")
chat = spark.read.format("mongo") \
    .option("uri", "mongodb://localhost:27017/") \
    .option("database", "test") \
    .option("collection", "chat_text") \
    .load()
key = spark.read.format("mongo") \
    .option("uri", "mongodb://localhost:27017/") \
    .option("database", "test") \
    .option("collection", "key_record") \
    .load()
key=key.drop('_id')
chat=chat.drop('_id')
df=chat.join(key, 
               chat.user1 == key.user, 
               "inner")
df=df.drop('user1').toPandas

user=df.filter(df.user==9999)
df=df.filter(df.user!=9999)
