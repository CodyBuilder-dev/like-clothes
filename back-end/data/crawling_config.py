import argparse
import json

# Config.py 파일 생성
parser = argparse.ArgumentParser()

page = '04'
start_category = 0
end_category = 40
save_json_name = f'musinsa_page{page}.json'

parser.add_argument('--base_url', type=str, default='https://store.musinsa.com')

parser.add_argument('--page', type=str, default=page)
parser.add_argument('--start_category', type=int, default=start_category)
parser.add_argument('--end_category', type=int, default=end_category)
parser.add_argument('--save_json_name', type=str, default=save_json_name)

parser.add_argument('--database_host', type=str, default='i02a401.p.ssafy.io')
parser.add_argument('--database_port', type=int, default=3306)
parser.add_argument('--database_user', type=str, default='root')
parser.add_argument('--database_passwd', type=str, default='likeclothes')
parser.add_argument('--database_name', type=str, default='LikeClothes')

config = parser.parse_args()
