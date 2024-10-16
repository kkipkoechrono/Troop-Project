"""created roles tables

Revision ID: e8f2df3586ed
Revises: 723bd86da3b0
Create Date: 2024-10-15 23:26:48.464960

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8f2df3586ed'
down_revision = '723bd86da3b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roles',
    sa.Column('role_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('role_name', sa.String(length=10), nullable=False),
    sa.Column('role_description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('role_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('roles')
    # ### end Alembic commands ###
