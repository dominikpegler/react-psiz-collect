from sqlalchemy import MetaData, Table, Column, Integer, create_engine, inspect
import json
import psycopg2


def table_exists(engine,name):
    ins = inspect(engine)
    ret = ins.dialect.has_table(engine.connect(),name)
    return ret


def write_survey_to_db(project_id, assignment_id, selection, DATABASE_URL):


    engine = create_engine(DATABASE_URL)
    metadata = MetaData(engine)

    with open(f"api/projects/{project_id}.json") as fp:
        res = json.load(fp)
        with open("api/projects/surveys/" + res['surveys'][0] + ".json") as fp2:
            survey = json.load(fp2)

    columns = list(survey["items"])
    table_name = survey["prefix"]

    # add leading 0s
    n_chars = max([len(i) for i in columns])
    columns = [table_name + "_" + i.zfill(n_chars) for i in columns]
    columns = [Column(i, Integer) for i in columns]

    selection = {table_name+"_" + key.zfill(n_chars): int(val) for key, val in selection.items()}
    new_survey_data = {"assignment_id": assignment_id, **selection}

    if not table_exists(engine, table_name): # table does not exist, so we will create it
        Table(table_name, metadata, Column("Id", Integer, primary_key=True, nullable=False), Column("assignment_id", Integer), *columns)
        print(metadata)
        metadata.create_all()    


    con = psycopg2.connect(DATABASE_URL)
    cur = con.cursor()
    sql_cols = str(tuple(new_survey_data.keys()))
    sql_vals = str(tuple(new_survey_data.values()))
    sql = f'INSERT INTO {table_name} {sql_cols} VALUES {sql_vals}'
    sql = sql.replace("'", "")
    cur.execute(sql)
    con.commit()
    cur.close()
    con.close()