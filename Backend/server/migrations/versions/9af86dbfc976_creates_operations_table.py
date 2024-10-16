"""creates operations table

Revision ID: 9af86dbfc976
Revises: c344aad040c5
Create Date: 2024-10-16 00:18:22.978923

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9af86dbfc976'
down_revision = 'c344aad040c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('operations',
    sa.Column('operations_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('operations_name', sa.String(length=200), nullable=False),
    sa.Column('operations_description', sa.Text(), nullable=False),
    sa.Column('operations_type', sa.Enum('Reconnaissance', 'Combat', 'Rescue', 'Logistics', 'Training', 'Other', name='operation_type_enum'), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('operations_status', sa.Enum('Planned', 'Ongoing', 'Completed', 'Aborted', name='operation_status_enum'), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('operations_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('operations')
    # ### end Alembic commands ###
