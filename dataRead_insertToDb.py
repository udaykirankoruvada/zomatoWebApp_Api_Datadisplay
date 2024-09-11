import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Float
from sqlalchemy.exc import SQLAlchemyError

def load_data(file_path):
    ## reading the data from csv file 
    df = pd.read_csv(file_path, encoding='ISO-8859-1')
    return df

def create_table(engine):
    ## schema of the table in a database
    metadata = MetaData()

    zomato_table = Table('zomato_restaurants', metadata,
                         Column('Restaurant_ID', Integer, primary_key=True),
                         Column('Restaurant_Name', String(255)),
                         Column('Country_Code', Integer),
                         Column('City', String(255)),
                         Column('Address', String(255)),
                         Column('Locality', String(255)),
                         Column('Locality_Verbose', String(255)),
                         Column('Longitude', Float),
                         Column('Latitude', Float),
                         Column('Cuisines', String(255)),
                         Column('Average_Cost_for_two', Integer),
                         Column('Currency', String(50)),
                         Column('Has_Table_booking', String(50)),
                         Column('Has_Online_delivery', String(50)),
                         Column('Is_Delivering_now', String(50)),
                         Column('Switch_to_order_menu', String(50)),
                         Column('Price_range', Integer),
                         Column('Aggregate_rating', Float),
                         Column('Rating_color', String(50)),
                         Column('Rating_text', String(50)),
                         Column('Votes', Integer)
                         )

    metadata.create_all(engine)
    return zomato_table

def insert_data(engine, table, df):
    ## inserting of the data into the zomato_restaurants
    conn = engine.connect()
    transaction = conn.begin()
    try:
        for index, row in df.iterrows():
            insert_statement = table.insert().values(
                Restaurant_ID=row['Restaurant ID'],
                Restaurant_Name=row['Restaurant Name'],
                Country_Code=row['Country Code'],
                City=row['City'],
                Address=row['Address'],
                Locality=row['Locality'],
                Locality_Verbose=row['Locality Verbose'],
                Longitude=row['Longitude'],
                Latitude=row['Latitude'],
                Cuisines=row['Cuisines'],
                Average_Cost_for_two=row['Average Cost for two'],
                Currency=row['Currency'],
                Has_Table_booking=row['Has Table booking'],
                Has_Online_delivery=row['Has Online delivery'],
                Is_Delivering_now=row['Is delivering now'],
                Switch_to_order_menu=row['Switch to order menu'],
                Price_range=row['Price range'],
                Aggregate_rating=row['Aggregate rating'],
                Rating_color=row['Rating color'],
                Rating_text=row['Rating text'],
                Votes=row['Votes']
            )
            conn.execute(insert_statement)
        transaction.commit()
    except SQLAlchemyError as e:
        transaction.rollback()
        print(f"Error: {e}")
    finally:
        conn.close()

def main():
    file_path = "F://industryready_enhance42//zomato//task-udaykirankoruvada//zomato.csv"

    df = load_data(file_path)

    engine = create_engine('sqlite:///F:/industryready_enhance42/zomato/task-udaykirankoruvada/zomato.db', echo=True)

    zomato_table = create_table(engine)

    insert_data(engine, zomato_table, df)

    print("Data has been successfully loaded into the database.")

if __name__ == '__main__':
    main()
